-- CreateEnum
CREATE TYPE "CheckpointStatus" AS ENUM ('OrderProcessed', 'PickUpPlanned', 'Upgrade', 'InboundScan', 'DestinationDeliveryCenter', 'Scheduled');

-- CreateTable
CREATE TABLE "Checkpoint" (
    "id" TEXT NOT NULL,
    "location" TEXT,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CheckpointStatus" NOT NULL,
    "statusText" TEXT,
    "statusDetails" TEXT,
    "trackingNumber" TEXT NOT NULL,

    CONSTRAINT "Checkpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracking" (
    "id" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "orderNo" TEXT NOT NULL,
    "courier" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "destinationCountryISO3" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,

    CONSTRAINT "DeliveryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "articleNo" TEXT NOT NULL,
    "imageUrl" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tracking_trackingNumber_key" ON "Tracking"("trackingNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Tracking_orderNo_key" ON "Tracking"("orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "Article_articleNo_key" ON "Article"("articleNo");

-- AddForeignKey
ALTER TABLE "Checkpoint" ADD CONSTRAINT "Checkpoint_trackingNumber_fkey" FOREIGN KEY ("trackingNumber") REFERENCES "Tracking"("trackingNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryItem" ADD CONSTRAINT "DeliveryItem_trackingNumber_fkey" FOREIGN KEY ("trackingNumber") REFERENCES "Tracking"("trackingNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryItem" ADD CONSTRAINT "DeliveryItem_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
