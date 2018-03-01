CREATE FUNCTION notify_diary_entry_change() RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $$

DECLARE
  link TEXT;
BEGIN
  link := (
    SELECT
      diaries.link
    FROM
      diaries
    WHERE
      id = NEW.diary_id
  );

  PERFORM pg_notify(
    'diary_entry_change',
    json_build_object('diaryLink', link, 'body', NEW.body, 'note_date', NEW.note_date)::text
  );

  RETURN NULL;
END;
$$;

CREATE TRIGGER diary_entry_change AFTER INSERT OR UPDATE ON diary_entries
FOR EACH ROW EXECUTE PROCEDURE notify_diary_entry_change();
