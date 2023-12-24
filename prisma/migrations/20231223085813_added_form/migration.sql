/*
  Warnings:

  - You are about to drop the column `quiz_id` on the `quize_marks` table. All the data in the column will be lost.
  - Added the required column `form_id` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `form_id` to the `quize_marks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "quize_marks" DROP CONSTRAINT "quize_marks_quiz_id_fkey";

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "form_id" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "quize_marks" DROP COLUMN "quiz_id",
ADD COLUMN     "form_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "form" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quize_marks" ADD CONSTRAINT "quize_marks_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
