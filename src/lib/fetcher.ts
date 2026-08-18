import { createClient } from '@/lib/supabase/client';

type Filters = {
  id?: string;
  order?: { column: string; ascending: boolean };
  single?: boolean;
};

export const fetcher = async ([table, filters]: [string, Filters?]) => {
  const supabase = createClient();
  let query = supabase.from(table).select('*');

  if (filters?.id) {
    query = query.eq('id', filters.id);
  }

  if (filters?.order) {
    query = query.order(filters.order.column, { ascending: filters.order.ascending });
  }

  if (filters?.single || filters?.id) {
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
