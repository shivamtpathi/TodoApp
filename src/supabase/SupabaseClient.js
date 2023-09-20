import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdfencbbyrwsdpambffc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkZmVuY2JieXJ3c2RwYW1iZmZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1NzE2NzUsImV4cCI6MTk5NTE0NzY3NX0.nbrDQJE3QAUxPpYZzdManQt13SFtXN5cgZ7Hda7uufU"
export const supabase = createClient(supabaseUrl, supabaseKey)