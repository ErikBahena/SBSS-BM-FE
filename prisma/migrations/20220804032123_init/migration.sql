-- CreateTable
CREATE TABLE "client" (
    "client_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "photo_url" VARCHAR(255),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "client_address" (
    "client_address_id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "client_address_pkey" PRIMARY KEY ("client_address_id")
);

-- CreateTable
CREATE TABLE "employee" (
    "employee_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "photo_url" VARCHAR(255),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "employee_address" (
    "employee_address_id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "employee_address_pkey" PRIMARY KEY ("employee_address_id")
);

-- CreateTable
CREATE TABLE "job" (
    "job_id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "job_employee" (
    "job_employee_id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "job_id" INTEGER NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "job_employee_pkey" PRIMARY KEY ("job_employee_id")
);

-- CreateTable
CREATE TABLE "job_employee_labor" (
    "job_employee_labor_id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDateTime" VARCHAR(255) NOT NULL,
    "endDateTime" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "job_employee_id" INTEGER NOT NULL,

    CONSTRAINT "job_employee_labor_pkey" PRIMARY KEY ("job_employee_labor_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "policy" BOOLEAN NOT NULL,
    "photo_url" VARCHAR(255),
    "phone" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_address" (
    "user_address_id" SERIAL NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "state" VARCHAR(30) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_unique" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_unique" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_address" ADD CONSTRAINT "client_address_client_id_foreign" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employee_address" ADD CONSTRAINT "employee_address_employee_id_foreign" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_client_id_foreign" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_employee" ADD CONSTRAINT "job_employee_employee_id_foreign" FOREIGN KEY ("employee_id") REFERENCES "employee"("employee_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_employee" ADD CONSTRAINT "job_employee_job_id_foreign" FOREIGN KEY ("job_id") REFERENCES "job"("job_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "job_employee_labor" ADD CONSTRAINT "job_employee_labor_job_employee_id_foreign" FOREIGN KEY ("job_employee_id") REFERENCES "job_employee"("job_employee_id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE NO ACTION;
