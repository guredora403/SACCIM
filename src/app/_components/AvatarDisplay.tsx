"use client"
import React from 'react';
import { Flex, View, Image, Text } from '@adobe/react-spectrum';
import { getBaseUrl } from '~/utils/url';

// アバター情報の型定義
export interface AvatarDisplayProps {
  name: string;
  iconFileName?: string;
  size?: 'S' | 'M' | 'L'; // サイズバリエーション
}

/**
 * アバター表示用の汎用コンポーネント
 */
export function AvatarDisplay({
  name,
  iconFileName = 'avatars/default.png',
  size = 'M',
}: AvatarDisplayProps) {
  // サイズに基づいたスタイル設定
  const sizeMap = {
    S: { imageSize: 32, textClass: 'text-sm', gap: 4 },
    M: { imageSize: 48, textClass: 'text-base', gap: 8 },
    L: { imageSize: 64, textClass: 'text-xl', gap: 12 }
  };
  
  const { imageSize, textClass, gap } = sizeMap[size];
  
  // 現時点ではアイコンアップロード機能がないため、プレースホルダー画像を使用
  // 実際の実装ではSupabaseのストレージURLなどを使うことになるでしょう
  const avatarImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=${imageSize * 2}`;
  
  return (
    <Flex 
      direction="row" 
      gap={gap} 
      alignItems="center"
    >
      <View 
        backgroundColor="gray-100" 
        width={imageSize} 
        height={imageSize} 
        overflow="hidden"
      >
        <img 
          src={avatarImage} 
          alt={`${name}のアバター`} 
          width={imageSize} 
          height={imageSize}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
        </View>
        <Text UNSAFE_className={'font-medium ' + textClass}>
          {name}
        </Text>
    </Flex>
  );
}
