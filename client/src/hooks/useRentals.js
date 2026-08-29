import { useState, useCallback, useMemo } from 'react';
import { mockRentals } from '@/data/rentalData';
import { toast } from 'sonner';

/**
 * Custom React Hook for CampusShare Rentals Dashboard (/rentals).
 */
export function useRentals() {
  const [rentals, setRentals] = useState(mockRentals);

  const activeRentals = useMemo(
    () => rentals.filter((r) => r.status === 'active'),
    [rentals]
  );

  const upcomingRentals = useMemo(
    () => rentals.filter((r) => r.status === 'upcoming'),
    [rentals]
  );

  const completedRentals = useMemo(
    () => rentals.filter((r) => r.status === 'completed'),
    [rentals]
  );

  const overdueRentals = useMemo(
    () => rentals.filter((r) => r.status === 'overdue'),
    [rentals]
  );

  const getRentalById = useCallback(
    (id) => rentals.find((r) => String(r.id) === String(id)) || rentals[0],
    [rentals]
  );

  const cancelRental = useCallback((rentalId) => {
    setRentals((prev) =>
      prev.map((item) =>
        item.id === rentalId ? { ...item, status: 'cancelled' } : item
      )
    );
    toast.info('Rental reservation cancelled.');
  }, []);

  return {
    rentals,
    activeRentals,
    upcomingRentals,
    completedRentals,
    overdueRentals,
    getRentalById,
    cancelRental,
  };
}
