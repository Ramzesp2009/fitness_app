-- розширення
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- користувачі
-- CREATE TABLE users (
-- 	id 			UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	username 	VARCHAR(50) UNIQUE NOT NULL,
-- 	email 		VARCHAR(100) UNIQUE NOT NULL,
-- 	password 	VARCHAR(100) NOT NULL,
-- 	created_at 	TIMESTAMPTZ DEFAULT NOW(),
-- 	updated_at  TIMESTAMPTZ DEFAULT NOW()
-- );

-- програми тренувань
-- CREATE TABLE programs (
-- 	id 			UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	user_id 	UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- 	name 		VARCHAR(100) NOT NULL,
-- 	description TEXT,
-- 	cycle_type 	VARCHAR(20) DEFAULT 'weekly', 		-- weekly / custom
-- 	created_at 	TIMESTAMPTZ DEFAULT NOW()
-- );

-- тижні програми (легкий/середній/важкий)
-- CREATE TABLE program_weeks (
-- 	id 			UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	program_id 	UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
-- 	week_number INTEGER NOT NULL,
-- 	intensity	VARCHAR(10) NOT NULL CHECK (intensity IN ('light', 'medium', 'heavy')),
-- 	UNIQUE(program_id, week_number)
-- );

-- вправи
-- CREATE TABLE exercises (
-- 	id 				UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	name 			VARCHAR(100) NOT NULL,
-- 	muscle_group 	VARCHAR(100),
-- 	is_custom 		BOOLEAN DEFAULT false,
-- 	user_id 		UUID REFERENCES users(id) ON DELETE SET NULL
-- );

-- тренування
-- CREATE TABLE workouts (
-- 	id 			UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	user_id		UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- 	program_id 	UUID REFERENCES programs(id) on DELETE SET NULL,
-- 	week_id 	UUID REFERENCES program_weeks(id) ON DELETE SET NULL,
-- 	name 		VARCHAR(100),
-- 	date 		DATE NOT NULL DEFAULT CURRENT_DATE,
-- 	notes 		TEXT,
-- 	created_at	TIMESTAMPTZ DEFAULT NOW()
-- );

-- підходи
-- CREATE TABLE workout_sets (
-- 	id 				UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-- 	workout_id 		UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
-- 	exercises_id 	UUID NOT NULL REFERENCES exercises(id),
-- 	set_number		INTEGER NOT NULL,
-- 	reps			INTEGER,
-- 	weight_kg		DECIMAL(6,2),
-- 	rpe				DECIMAL(3,1),		-- Rate of Perceived Exertion
-- 	one_rm 			DECIMAL(6,2), 		-- 1ПМ автоматично
-- 	created_at		TIMESTAMPTZ DEFAULT NOW()
-- );

-- автоматичний розрахунок 1ПМ (формула Brzycki)
-- CREATE OR REPLACE FUNCTION calc_one_rm()
-- RETURNS TRIGGER AS $$
-- BEGIN
-- 	IF NEW.reps IS NOT NULL AND NEW.weight_kg IS NOT NULL AND NEW.reps > 0 THEN
-- 		NEW.one_rm := ROUND(
-- 			(NEW.weight_kg / (1.0278 - 0.0278 * NEW.reps))::NUMERIC, 2
-- 		);
-- 	END IF;
-- 	RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER trg_calc_one_rm
-- 	BEFORE INSERT OR UPDATE ON workout_sets
-- 	FOR EACH ROW EXECUTE FUNCTION calc_one_rm();

-- соціальна мережа
-- CREATE TABLE follows (
-- 	follower_id 	UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- 	following_id 	UUID NOT NULL REFERENCES users(id) on DELETE CASCADE,
-- 	status 			VARCHAR(25) DEFAULT 'pending' CHECK (status in ('pending', 'accepted', 'rejected')),
-- 	created_at 		TIMESTAMPTZ DEFAULT NOW(),
-- 	PRIMARY KEY (follower_id, following_id)
-- );

-- індекси продуктивності
-- CREATE INDEX idx_workouts_user_date ON workouts(user_id, date DESC);
-- CREATE INDEX idx_workout_sets_workout ON workout_sets(workout_id);
-- CREATE INDEX idx_follws_following ON follows(following_id, status);