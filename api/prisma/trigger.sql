create or replace function calc_one_rm() 
returns trigger as $$
begin
    if new.reps is not null and new.weight_kg is not null and new.reps > 0 then
        new.one_rm := round(
            (new.weight_kg / (1.0278 - 0.0278 * new.reps))::numeric, 2
        );
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_calc_one_rm
    before insert or update on workout_sets
    for each row execute function calc_one_rm();