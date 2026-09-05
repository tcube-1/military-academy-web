ALTER TABLE "forces" RENAME COLUMN "force_id" TO "code";--> statement-breakpoint
ALTER TABLE "forces" DROP CONSTRAINT "forces_force_id_unique";--> statement-breakpoint
ALTER TABLE "forces" ADD CONSTRAINT "forces_code_unique" UNIQUE("code");--> statement-breakpoint
ALTER TABLE "service_roles" ADD CONSTRAINT "service_roles_force_id_title_unique" UNIQUE("force_id","title");