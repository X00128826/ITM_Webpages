/*
  Supabase configuration.
*/

// Supabase dependency is imported near end of index.html
const { createClient } = supabase;

// Get these values from the API section of your Supabase account
const supabaseUrl = 'https://lgidzebcrgblaqrxaaxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaWR6ZWJjcmdibGFxcnhhYXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYxNjQxOTQsImV4cCI6MTk2MTc0MDE5NH0.iGcBT7IWfsv1iEUztMRFqaEhFQaRbRqZtyZ87UA1tIQ';

// Note text case: Supabase != supabase
const Supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase Instance: ', Supabase);

// Export to allow import elsewhere
export  {
  Supabase
};

//https://uryfyikyrjahixunsgna.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyeWZ5aWt5cmphaGl4dW5zZ25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5NjYwNjQsImV4cCI6MTk2MTU0MjA2NH0.tL39sILc45ISWZNUzHdD_A_qG8kPveIj_fXmafeBJgM

//https://lgidzebcrgblaqrxaaxn.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaWR6ZWJjcmdibGFxcnhhYXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYxNjQxOTQsImV4cCI6MTk2MTc0MDE5NH0.iGcBT7IWfsv1iEUztMRFqaEhFQaRbRqZtyZ87UA1tIQ


//curl 'https://lgidzebcrgblaqrxaaxn.supabase.co/rest/v1/presentation?select=*' 
//-H eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyeWZ5aWt5cmphaGl4dW5zZ25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU5NjYwNjQsImV4cCI6MTk2MTU0MjA2NH0.tL39sILc45ISWZNUzHdD_A_qG8kPveIj_fXmafeBJgM