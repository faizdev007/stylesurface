import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fjimfhimkopmzrnpiert.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaW1maGlta29wbXpybnBpZXJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NjA2MzMsImV4cCI6MjA3OTUzNjYzM30.jTMecxTkrJfC8TkU0pEvHs8iRWwPkW3LTh4QGJaAaZ0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);