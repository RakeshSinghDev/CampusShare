import { listingService } from '@/services/listingService';
import { ListingModel } from '@/models/Listing';
import { toast } from 'sonner';

export const listingController = {
  /**
   * Submit new listing form payload to backend API
   */
  async handleCreateListing(formData, navigate, queryClient) {
    try {
      const payload = ListingModel.toCreateListingPayload(formData);
      console.log('[Listing Upload] Sending create listing payload:', payload);

      const response = await listingService.createListing(payload);
      const createdListing = response.data || response;

      toast.success('Your listing is live on CampusShare!');

      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['listings'] });
        queryClient.invalidateQueries({ queryKey: ['userListings'] });
      }

      const listingId = createdListing._id || createdListing.id;
      if (navigate && listingId) {
        navigate(`/product/${listingId}`);
      }
      return createdListing;
    } catch (error) {
      console.error('[Listing Upload] Creation error details:', error.data || error);
      const errorMsg = error.data?.message || error.message || 'Failed to create listing. Please try again.';

      if (error.data?.code === 'STUDENT_VERIFICATION_REQUIRED') {
        toast.error('Student verification required to list resources.', {
          action: navigate ? { label: 'Verify Student', onClick: () => navigate('/verify') } : undefined,
        });
      } else {
        toast.error(errorMsg);
      }
      throw error;
    }
  },

  /**
   * Handle toggling active/paused status on listing
   */
  async handleToggleStatus(listingId, currentStatus, queryClient) {
    try {
      const nextStatus = currentStatus === 'active' ? 'paused' : 'active';
      await listingService.updateListingStatus(listingId, nextStatus);

      toast.success(`Listing ${nextStatus === 'active' ? 'resumed' : 'paused'} successfully.`);

      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['listings'] });
        queryClient.invalidateQueries({ queryKey: ['userListings'] });
        queryClient.invalidateQueries({ queryKey: ['listing', listingId] });
      }
    } catch (error) {
      toast.error(error.data?.message || error.message || 'Failed to update listing status');
    }
  },

  /**
   * Handle soft deleting a listing
   */
  async handleDeleteListing(listingId, queryClient) {
    try {
      await listingService.deleteListing(listingId);
      toast.success('Listing deleted.');

      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['listings'] });
        queryClient.invalidateQueries({ queryKey: ['userListings'] });
      }
    } catch (error) {
      toast.error(error.data?.message || error.message || 'Failed to delete listing');
    }
  },
};
