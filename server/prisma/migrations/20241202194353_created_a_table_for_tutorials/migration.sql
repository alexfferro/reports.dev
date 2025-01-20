-- CreateTable
CREATE TABLE "Tutorials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "ReportsCategory" NOT NULL DEFAULT 'OTHERS',
    "content" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tutorials_pkey" PRIMARY KEY ("id")
);
