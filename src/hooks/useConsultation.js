/**
 * 상담 신청 훅
 * 상담 신청 폼 제출을 처리
 */

import { consultationService } from '../services';
import { CONSULTATION_MESSAGES } from '../constants';

export function useConsultation() {
  const submitConsultation = async (formData) => {
    const result = await consultationService.create(formData);

    if (result.success) {
      alert(CONSULTATION_MESSAGES.CREATE_SUCCESS);
      return true;
    } else {
      alert(result.error);
      return false;
    }
  };

  return { submitConsultation };
}
