-- --------------------------------------------------------
-- Хост:                         postgresql-16
-- Версия сервера:               PostgreSQL 16.1, compiled by Visual C++ build 1937, 64-bit
-- Операционная система:         
-- HeidiSQL Версия:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Дамп структуры для таблица public.awards
CREATE TABLE IF NOT EXISTS "awards" (
	"id" SERIAL NOT NULL,
	"user_id" INTEGER NULL DEFAULT NULL,
	"event_id" INTEGER NULL DEFAULT NULL,
	"title" TEXT NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "awards_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "awards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_auth" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.events
CREATE TABLE IF NOT EXISTS "events" (
	"id" SERIAL NOT NULL,
	"game" UNKNOWN NULL DEFAULT NULL,
	"players" TEXT NULL DEFAULT NULL,
	"date" TIMESTAMP NULL DEFAULT NULL,
	"leader" INTEGER NULL DEFAULT NULL,
	"can_registry" BOOLEAN NULL DEFAULT NULL,
	"comment" TEXT NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "events_leader_fkey" FOREIGN KEY ("leader") REFERENCES "users_auth" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.result_games
CREATE TABLE IF NOT EXISTS "result_games" (
	"player" INTEGER NULL DEFAULT NULL,
	"date" TIMESTAMP NULL DEFAULT NULL,
	"game" UNKNOWN NULL DEFAULT NULL,
	"points" INTEGER NULL DEFAULT NULL,
	"result" BOOLEAN NULL DEFAULT NULL,
	CONSTRAINT "result_games_player_fkey" FOREIGN KEY ("player") REFERENCES "users_auth" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.roles
CREATE TABLE IF NOT EXISTS "roles" (
	"id" SERIAL NOT NULL,
	"name" TEXT NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE ("name")
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.users
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL,
	"nickname" TEXT NULL DEFAULT NULL,
	"fio" TEXT NULL DEFAULT NULL,
	"tg" TEXT NULL DEFAULT NULL,
	"comment" TEXT NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "users_auth" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.users_auth
CREATE TABLE IF NOT EXISTS "users_auth" (
	"id" SERIAL NOT NULL,
	"avatar" TEXT NULL DEFAULT NULL,
	"login" TEXT NULL DEFAULT NULL,
	"password" TEXT NULL DEFAULT NULL,
	PRIMARY KEY ("id")
);

-- Экспортируемые данные не выделены.

-- Дамп структуры для таблица public.users_roles
CREATE TABLE IF NOT EXISTS "users_roles" (
	"user_id" INTEGER NOT NULL,
	"role_id" INTEGER NOT NULL,
	PRIMARY KEY ("user_id", "role_id"),
	CONSTRAINT "users_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON UPDATE NO ACTION ON DELETE CASCADE,
	CONSTRAINT "users_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_auth" ("id") ON UPDATE NO ACTION ON DELETE CASCADE
);

-- Экспортируемые данные не выделены.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
