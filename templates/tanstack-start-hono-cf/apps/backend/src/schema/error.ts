import { z } from '@hono/zod-openapi';

/**
 * 標準エラーレスポンススキーマ
 *
 * すべてのAPIエンドポイントで統一されたエラーレスポンス構造を提供します。
 *
 * 現在はシンプルな { message } 構造ですが、将来的に以下のフィールドを追加できます:
 * - statusCode: HTTPステータスコード
 * - errorCode: アプリケーション固有のエラーコード（フロントエンドでのメッセージマッピング用）
 * - details: エラーの詳細情報
 * - timestamp: エラー発生時刻
 */
export const ErrorResponseSchema = z
  .object({
    message: z.string().openapi({
      example: 'エラーが発生しました',
      description: 'エラーメッセージ',
    }),
  })
  .openapi('ErrorResponse');

/**
 * 500 Internal Server Error用エラースキーマ
 */
export const InternalServerErrorSchema = ErrorResponseSchema.openapi('InternalServerError');
