CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`created` text NOT NULL,
	`status` text NOT NULL,
	`details` text NOT NULL
);

--> statement-breakpoint
CREATE INDEX `idx_bookings_owner_created` ON `bookings` (`owner`,`created`);