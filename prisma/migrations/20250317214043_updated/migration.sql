/*
  Warnings:

  - You are about to drop the column `userId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessToken]` on the table `Auth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_userId_key` ON `user`;

-- AlterTable
ALTER TABLE `auth` MODIFY `refreshToken` VARCHAR(191) NULL,
    MODIFY `accessToken` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `Auth_accessToken_key` ON `Auth`(`accessToken`);
