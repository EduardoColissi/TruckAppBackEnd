-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `numCelular` VARCHAR(191) NOT NULL,
    `vehicleType` VARCHAR(191) NOT NULL,
    `licensePlate` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_cpf_key`(`cpf`),
    UNIQUE INDEX `users_numCelular_key`(`numCelular`),
    UNIQUE INDEX `users_licensePlate_key`(`licensePlate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freights` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `deadline` VARCHAR(191) NOT NULL,
    `destiny` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,
    `points` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `truckType` VARCHAR(191) NOT NULL,
    `grossWeight` DECIMAL(65, 30) NOT NULL,
    `commodityValue` DECIMAL(65, 30) NOT NULL,
    `customHouse` VARCHAR(191) NOT NULL,
    `authorId` VARCHAR(191) NULL,

    UNIQUE INDEX `freights_authorId_key`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `freights` ADD CONSTRAINT `freights_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
