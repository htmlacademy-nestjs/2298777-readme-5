-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published', 'repost');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'image', 'link');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publish_date" TIMESTAMP(3),
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "original_author_id" TEXT,
    "original_post_id" TEXT,
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "comments_count" INTEGER NOT NULL DEFAULT 0,
    "type" "PostType" NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_posts" (
    "post_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "video_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "text_posts" (
    "post_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "anons_text" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "quote_posts" (
    "post_id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "image_posts" (
    "post_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "link_posts" (
    "post_id" TEXT NOT NULL,
    "link_url" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagsOnPost" (
    "post_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "TagsOnPost_pkey" PRIMARY KEY ("post_id","tag_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "video_posts_post_id_key" ON "video_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "text_posts_post_id_key" ON "text_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "quote_posts_post_id_key" ON "quote_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "image_posts_post_id_key" ON "image_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "link_posts_post_id_key" ON "link_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_id_key" ON "tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- CreateIndex
CREATE INDEX "tags_name_idx" ON "tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "likes_id_key" ON "likes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "comments_id_key" ON "comments"("id");

-- AddForeignKey
ALTER TABLE "video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_posts" ADD CONSTRAINT "image_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagsOnPost" ADD CONSTRAINT "TagsOnPost_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
