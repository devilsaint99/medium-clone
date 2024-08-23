/*
  Warnings:

  - Added the required column `LastUpdated` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "LastUpdated" TIMESTAMP(3) NOT NULL;
