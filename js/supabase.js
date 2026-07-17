// ==========================================
// AI Empire - Supabase Configuration
// ==========================================
// Replace these with your Supabase project credentials
// Get them from: https://app.supabase.com → Your Project → Settings → API

const SUPABASE_URL = 'https://fobgafvlcqtujqtyhvhs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_1AGfs6SLemhi-KCaRIsDag_x_O3nNtq';

// Supabase SDK loaded from CDN (see index.html)
let supabaseClient = null;

const SupabaseDB = (() => {
  function init() {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
      console.warn('[Supabase] Not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in js/supabase.js');
      return null;
    }
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.log('[Supabase] Initialized:', SUPABASE_URL);
      // Verify actual connectivity
      supabaseClient.from('_health').select().single().then(() => {
        console.log('[Supabase] Connection verified');
      }).catch(() => {
        console.error('[Supabase] WARNING: Cannot reach server at', SUPABASE_URL,
          '— check your Supabase project URL and anon key.');
      });
      return supabaseClient;
    } catch (e) {
      console.error('[Supabase] Init failed:', e);
      return null;
    }
  }

  function getClient() {
    if (!supabaseClient) init();
    return supabaseClient;
  }

  function isConfigured() {
    return SUPABASE_URL !== 'YOUR_SUPABASE_URL';
  }

  // --- Auth ---
  async function signUp(email, password, username) {
    const client = getClient();
    if (!client) return { error: { message: 'Supabase not configured' } };

    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    return { data, error };
  }

  async function signIn(email, password) {
    const client = getClient();
    if (!client) return { error: { message: 'Supabase not configured' } };

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  async function signOut() {
    const client = getClient();
    if (!client) return;
    await client.auth.signOut();
  }

  async function getUser() {
    const client = getClient();
    if (!client) return null;
    const { data: { user } } = await client.auth.getUser();
    return user;
  }

  function onAuthChange(callback) {
    const client = getClient();
    if (!client) return;
    client.auth.onAuthStateChange((event, session) => {
      callback(event, session?.user || null);
    });
  }

  // --- Marketplace Tasks ---
  async function getMarketTasks(status = 'open') {
    const client = getClient();
    if (!client) return { data: [], error: null };

    let query = client
      .from('market_tasks')
      .select('*, creator:profiles(username, avatar_url)')
      .eq('status', status)
      .order('created_at', { ascending: false });

    const { data, error } = await query;
    return { data: data || [], error };
  }

  async function getMyTasks(userId) {
    const client = getClient();
    if (!client) return { data: [], error: null };

    const { data, error } = await client
      .from('market_tasks')
      .select('*')
      .eq('creator_id', userId)
      .order('created_at', { ascending: false });
    return { data: data || [], error };
  }

  async function createTask(taskData) {
    const client = getClient();
    if (!client) return { error: { message: 'Supabase not configured' } };

    const { data, error } = await client
      .from('market_tasks')
      .insert([{
        creator_id: taskData.creatorId,
        title: taskData.title,
        description: taskData.description,
        reward_amount: taskData.rewardAmount,
        reward_currency: taskData.rewardCurrency || 'USD',
        category: taskData.category,
        status: 'pending_payment',
      }])
      .select()
      .single();
    return { data, error };
  }

  async function activateTask(taskId) {
    const client = getClient();
    if (!client) return { error: { message: 'Not configured' } };

    const { data, error } = await client
      .from('market_tasks')
      .update({ status: 'open' })
      .eq('id', taskId)
      .select()
      .single();
    return { data, error };
  }

  // --- Task Submissions ---
  async function submitTaskCompletion(taskId, userId, proofUrl, description) {
    const client = getClient();
    if (!client) return { error: { message: 'Not configured' } };

    const { data, error } = await client
      .from('task_submissions')
      .insert([{
        task_id: taskId,
        submitter_id: userId,
        proof_url: proofUrl,
        description,
        status: 'pending',
      }])
      .select()
      .single();
    return { data, error };
  }

  async function getTaskSubmissions(taskId) {
    const client = getClient();
    if (!client) return { data: [], error: null };

    const { data, error } = await client
      .from('task_submissions')
      .select('*, submitter:profiles(username, avatar_url)')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false });
    return { data: data || [], error };
  }

  async function approveSubmission(submissionId, taskId) {
    const client = getClient();
    if (!client) return { error: { message: 'Not configured' } };

    const { error } = await client
      .from('task_submissions')
      .update({ status: 'approved' })
      .eq('id', submissionId);
    if (error) return { error };

    // Mark task as completed
    await client
      .from('market_tasks')
      .update({ status: 'completed' })
      .eq('id', taskId);

    return { data: true };
  }

  async function rejectSubmission(submissionId) {
    const client = getClient();
    if (!client) return { error: { message: 'Not configured' } };

    const { error } = await client
      .from('task_submissions')
      .update({ status: 'rejected' })
      .eq('id', submissionId);
    return { error };
  }

  return {
    init, getClient, isConfigured,
    signUp, signIn, signOut, getUser, onAuthChange,
    getMarketTasks, getMyTasks, createTask, activateTask,
    submitTaskCompletion, getTaskSubmissions, approveSubmission, rejectSubmission,
  };
})();
