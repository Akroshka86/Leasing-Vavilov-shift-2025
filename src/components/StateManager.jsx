import { create } from 'zustand';

const useStateManager = create((set) => ({
  rentalPeriod: null,
  rentalDays: 0,
  setRentalPeriod: (startDate, endDate) => {
    const timeDiff = Math.abs(endDate - startDate);
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    set({ rentalPeriod: { startDate, endDate }, rentalDays: days });
  },
}));
export default useStateManager;