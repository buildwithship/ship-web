'use client';

import { useState } from 'react';

import {
  Check,
  Share2,
} from 'lucide-react';

import PushButton from './PushButton';

interface ProjectDetailActionsProps {
  initialPushCount: number;
  projectName: string;
}

export default function ProjectDetailActions({
  initialPushCount,
  projectName,
}: ProjectDetailActionsProps) {
  const [copied, setCopied] =
    useState(false);

  const handleShare = async () => {
    const url =
      window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: projectName,
        url,
      });

      return;
    }

    await navigator.clipboard.writeText(
      url,
    );

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  return (
    <div className="project-detail-actions">
      <PushButton
        initialCount={
          initialPushCount
        }
      />

      <button
        type="button"
        className="project-detail-share"
        onClick={handleShare}
      >
        {copied ? (
          <Check size={17} />
        ) : (
          <Share2 size={17} />
        )}

        {copied
          ? '링크 복사됨'
          : '공유'}
      </button>
    </div>
  );
}