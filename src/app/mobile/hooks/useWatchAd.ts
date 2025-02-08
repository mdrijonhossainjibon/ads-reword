'use client'

import { useDispatch, useSelector } from 'react-redux'
import { watchAdRequest } from '@/modules/private/tasks/reducer'
import { selectTasksLoading, selectTasksError } from '@/modules/private/tasks/selectors'

 
export function useWatchAd() {
    const dispatch = useDispatch()
    const loading = useSelector(selectTasksLoading)
    const error = useSelector(selectTasksError)

    const watchAd = async (): Promise<void> => {
        dispatch(watchAdRequest())
    }

    return { watchAd, loading, error }
}