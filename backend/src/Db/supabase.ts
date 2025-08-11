import { createClient } from "@supabase/supabase-js";

const supabaseURI = 'https://dsiwprmwzkvgdcdhzhwa.supabase.co'
const supabaseKEY = `${process.env.SUPABASE_KEY}`

const supabase = createClient(supabaseURI, supabaseKEY)

export default supabase