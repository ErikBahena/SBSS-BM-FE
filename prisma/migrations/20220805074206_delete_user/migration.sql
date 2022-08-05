-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_address" DROP CONSTRAINT "user_address_user_id_fkey";

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
