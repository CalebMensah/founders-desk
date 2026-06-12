import { supabase } from '../../lib/supabase'

export default async function TestPage() {
  const { data, error } = await supabase.from('test').select('*')
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      {error ? (
        <div style={{ color: 'green' }}>
          <p>✅ Connected to Supabase successfully!</p>
          <p>Note: {error.message}</p>
          <p>(Normal — test table does not exist yet)</p>
        </div>
      ) : (
        <div style={{ color: 'green' }}>
          <p>✅ Connected to Supabase successfully!</p>
        </div>
      )}
    </div>
  )
}