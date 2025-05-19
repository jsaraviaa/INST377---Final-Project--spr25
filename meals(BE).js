
import { createClient } from '@supabase/supabase-js';

<script src="https://unpkg.com/@supabase/supabase-js@2"></script>

const supabaseClient = require('@supabase/supabase-js');

const supabaseUrl = 'https://gbanwggovbkohnjlcnnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiYW53Z2dvdmJrb2huamxjbm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNzAzMTgsImV4cCI6MjA2Mjg0NjMxOH0.2mFSg6EKK30awonh0lep4Gb0UvpKbvEJD9q_abU3Tx4';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;
    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId);

    if (error) return res.status(500).json({ error });
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { user_id, food, calories, protein, carbs, fat } = req.body;

    const { data, error } = await supabase.from('meals').insert([
      { user_id, food, calories, protein, carbs, fat }
    ]);

    if (error) return res.status(500).json({ error });
    res.status(201).json({ success: true, data });
  }

  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}