PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_widget` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type_id` text NOT NULL,
	`x` real NOT NULL,
	`y` real NOT NULL,
	`width` real NOT NULL,
	`height` real NOT NULL,
	`poll_interval` integer DEFAULT 5000 NOT NULL,
	`config` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_widget`("id", "type_id", "x", "y", "width", "height", "poll_interval", "config") SELECT "id", "type_id", "x", "y", "width", "height", "poll_interval", "config" FROM `widget`;--> statement-breakpoint
DROP TABLE `widget`;--> statement-breakpoint
ALTER TABLE `__new_widget` RENAME TO `widget`;--> statement-breakpoint
PRAGMA foreign_keys=ON;