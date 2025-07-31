import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DatabaseService } from '../lib/databaseService';
import type { PaginatedResponse, BaseFilters } from '../lib/types';

export function useDatabase<T>(
  tableName: string,
  filters?: BaseFilters
) {
  const queryClient = useQueryClient();
  const [service] = useState(() => new DatabaseService(tableName));

  // Get all records
  const {
    data: records,
    isLoading: isLoadingRecords,
    error: recordsError,
    refetch: refetchRecords
  } = useQuery({
    queryKey: [tableName, 'all', filters],
    queryFn: () => service.getAll<T>(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get single record
  const getRecord = useCallback((id: string) => {
    return useQuery({
      queryKey: [tableName, 'single', id],
      queryFn: () => service.getById<T>(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  }, [service, tableName]);

  // Create record
  const createMutation = useMutation({
    mutationFn: (data: any) => service.create<T>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
    },
  });

  // Update record
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      service.update<T>(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
      queryClient.invalidateQueries({ queryKey: [tableName, 'single', id] });
    },
  });

  // Delete record
  const deleteMutation = useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tableName] });
    },
  });

  // Search records
  const searchRecords = useCallback((query: string, fields?: string[]) => {
    return useQuery({
      queryKey: [tableName, 'search', query, fields],
      queryFn: () => service.search<T>(query, fields),
      enabled: !!query,
      staleTime: 2 * 60 * 1000, // 2 minutes
    });
  }, [service, tableName]);

  // Get records by field
  const getByField = useCallback((field: string, value: string) => {
    return useQuery({
      queryKey: [tableName, 'field', field, value],
      queryFn: () => service.getByField<T>(field, value),
      enabled: !!field && !!value,
      staleTime: 5 * 60 * 1000,
    });
  }, [service, tableName]);

  // Get statistics
  const getStats = useCallback(() => {
    return useQuery({
      queryKey: [tableName, 'stats'],
      queryFn: () => service.getStatistics(),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  }, [service, tableName]);

  return {
    // Data
    records: records?.data || [],
    pagination: records ? {
      total: records.total,
      page: records.page,
      limit: records.limit,
      totalPages: records.totalPages,
    } : null,
    
    // Loading states
    isLoadingRecords,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Errors
    recordsError,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    
    // Actions
    createRecord: createMutation.mutate,
    updateRecord: updateMutation.mutate,
    deleteRecord: deleteMutation.mutate,
    refetchRecords,
    
    // Hooks
    getRecord,
    searchRecords,
    getByField,
    getStats,
    
    // Service instance
    service,
  };
} 