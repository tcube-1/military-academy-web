DO $$ BEGIN
 CREATE TYPE "public"."blood_group" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"force_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"logo_url" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "forces_force_id_unique" UNIQUE("force_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"force_id" uuid NOT NULL,
	"title" text NOT NULL,
	"category" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "districts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"state_id" text NOT NULL,
	"lgd_code" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mandals" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"district_id" text NOT NULL,
	"lgd_code" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "states" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "villages" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"district_id" text NOT NULL,
	"mandal_id" text NOT NULL,
	"lgd_code" text,
	"status" text,
	"category" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"house_no" text,
	"village_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_education" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"qualification" text NOT NULL,
	"institution" text NOT NULL,
	"passing_year" integer,
	"percentage" real,
	"grade" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_family" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"name" text NOT NULL,
	"relation_type" text NOT NULL,
	"occupation" text,
	"contact_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_code" text NOT NULL,
	"full_name" text NOT NULL,
	"slug" text NOT NULL,
	"avatar_url" text,
	"mobile" text,
	"blood_group" "blood_group",
	"force_id" uuid,
	"service_role_id" uuid,
	"joining_year" integer,
	"status" text DEFAULT 'DRAFT' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "students_student_code_unique" UNIQUE("student_code"),
	CONSTRAINT "students_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_roles" ADD CONSTRAINT "service_roles_force_id_forces_id_fk" FOREIGN KEY ("force_id") REFERENCES "public"."forces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mandals" ADD CONSTRAINT "mandals_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "villages" ADD CONSTRAINT "villages_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "villages" ADD CONSTRAINT "villages_mandal_id_mandals_id_fk" FOREIGN KEY ("mandal_id") REFERENCES "public"."mandals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_addresses" ADD CONSTRAINT "student_addresses_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_addresses" ADD CONSTRAINT "student_addresses_village_id_villages_id_fk" FOREIGN KEY ("village_id") REFERENCES "public"."villages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_education" ADD CONSTRAINT "student_education_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_family" ADD CONSTRAINT "student_family_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_force_id_forces_id_fk" FOREIGN KEY ("force_id") REFERENCES "public"."forces"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_service_role_id_service_roles_id_fk" FOREIGN KEY ("service_role_id") REFERENCES "public"."service_roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "districts_state_id_idx" ON "districts" USING btree ("state_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "mandals_district_id_idx" ON "mandals" USING btree ("district_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "villages_mandal_id_idx" ON "villages" USING btree ("mandal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "villages_district_id_idx" ON "villages" USING btree ("district_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "villages_name_idx" ON "villages" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_student_code_idx" ON "students" USING btree ("student_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_slug_idx" ON "students" USING btree ("slug");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_force_id_idx" ON "students" USING btree ("force_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_service_role_id_idx" ON "students" USING btree ("service_role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_status_idx" ON "students" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "students_created_at_idx" ON "students" USING btree ("created_at");