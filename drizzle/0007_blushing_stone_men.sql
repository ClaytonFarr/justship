CREATE TABLE `password_reset_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`ip_address` text NOT NULL,
	`attempted_at` integer NOT NULL
);
