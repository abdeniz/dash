CREATE TABLE `widget` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type_id` text NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	`width` real NOT NULL,
	`height` real NOT NULL,
	`poll_interval` integer,
	`config` text NOT NULL,
	FOREIGN KEY (`type_id`) REFERENCES `widget_type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `widget_type` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
