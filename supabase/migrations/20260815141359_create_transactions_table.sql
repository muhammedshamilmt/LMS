CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT 'completed',
    payment_method VARCHAR(100) NOT NULL DEFAULT 'simulated',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own transactions
CREATE POLICY "Users can view their own transactions"
ON public.transactions FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
ON public.transactions FOR SELECT
USING (auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin'));

-- Only admins/service role can insert or update (we use service role for payments)
