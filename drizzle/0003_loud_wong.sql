CREATE TABLE `chat_conversations` (
	`id` varchar(64) NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`leadId` varchar(64),
	`status` enum('ativa','finalizada') NOT NULL DEFAULT 'ativa',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `chat_conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_leads` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`company` varchar(255),
	`segment` enum('construtoras','advocacia','outro'),
	`interest` text,
	`status` enum('novo','contatado','qualificado','convertido') NOT NULL DEFAULT 'novo',
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `chat_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` varchar(64) NOT NULL,
	`conversationId` varchar(64) NOT NULL,
	`role` enum('user','assistant','system') NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
