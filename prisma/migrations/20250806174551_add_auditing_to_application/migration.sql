/*
  Warnings:

  - Added the required column `createdById` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedById` to the `application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `application` ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdById` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedById` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application` ADD CONSTRAINT `application_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
