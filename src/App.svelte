<script lang="ts">
    import "./app.css";
    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

    import RootLayout from "$lib/layouts/root.svelte";

    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <RootLayout />
</QueryClientProvider>
