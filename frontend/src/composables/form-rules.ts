import { useI18n } from 'vue-i18n';
import { VideosService } from '@/services/videos-service';
import type { RequestFeedback } from '@/services/types/common';
import type { IsValidYtUrlResponseBody } from '@/services/types/videos';

export type FormRule<InputType> =
  | string
  | boolean
  | ((value: InputType) => string | boolean | Promise<string> | Promise<boolean>);

export const formRules = () => {
  const { t } = useI18n();

  const videosService: VideosService = new VideosService();

  const required = <InputType>(value: InputType) => !!value || t('general.formValidation.required');

  const sameValue = <InputType>(value: InputType, valueTwo: InputType) =>
    value === valueTwo || t('general.formValidation.sameValue');

  const isValidYtUrl = async (value: string) => {
    const feedback: RequestFeedback<IsValidYtUrlResponseBody> = await videosService.isValidYtUrl(
      value
    );

    if (feedback.isError || !feedback.data) {
      return t('general.formValidation.isValidYtUrl.error');
    }

    return feedback.data.isValidYtUrl && feedback.data.ytVideoId
      ? feedback.data
      : t('general.formValidation.isValidYtUrl.notValid');
  };

  return { required, sameValue, isValidYtUrl };
};
