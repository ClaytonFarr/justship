-- Add columns as nullable initially
ALTER TABLE `user` ADD COLUMN `username` text;
--> statement-breakpoint
ALTER TABLE `user` ADD COLUMN `password_hash` text;
--> statement-breakpoint
-- Update existing rows with a default value for username
UPDATE `user` SET `username` = `email` WHERE `username` IS NULL;
--> statement-breakpoint
-- Create a new table with the desired structure
CREATE TABLE `new_user` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `email_verified` integer,
  `username` text NOT NULL,
  `password_hash` text
);
--> statement-breakpoint
-- Copy data from the old table to the new one
INSERT INTO `new_user` (`id`, `email`, `email_verified`, `username`, `password_hash`)
SELECT `id`, `email`, `email_verified`, `username`, `password_hash`
FROM `user`;
--> statement-breakpoint
-- Drop the old table
DROP TABLE `user`;
--> statement-breakpoint
-- Rename the new table to the original name
ALTER TABLE `new_user` RENAME TO `user`;
--> statement-breakpoint
-- Create unique index for username
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);