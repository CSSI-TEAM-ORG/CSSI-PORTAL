import Supabase from '../../configs/supabaseClient.js';

const getNGOController = async (req, res) => {

    try {
        let { data: NGO, error1 } = await Supabase
            .from('NGO')
            .select('id, email, name, capacity, state, city, address')
            .order('name', { ascending: true });

        if (error1) {
            return res.status(500).json({ message: 'Error fetching data from Supabase', error1 });
        }

        if (!NGO[0]) {
            return res.status(404).json({ 'message': "No NGO found" })
        }
        return res.status(200).json(NGO);
    } catch (err) {
        console.error('Fetch failed due to:', err);
        return res.status(500).json({ message: 'Server Error', error: err.message });
    }
}

export { getNGOController }