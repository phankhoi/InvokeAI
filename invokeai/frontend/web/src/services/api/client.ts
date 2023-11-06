import { atom, computed } from 'nanostores';
import createClient from 'openapi-fetch';
import { paths } from 'services/api/schema';

/**
 * We use nanostores to store the token and base url for very simple reactivity
 */

/**
 * The user's auth token.
 */
export const $authToken = atom<string | undefined>();

/**
 * The OpenAPI base url.
 */
export const $baseUrl = atom<string | undefined>();

/**
 * The optional project-id header.
 */
export const $projectId = atom<string | undefined>();

/**
 * Autogenerated, type-safe fetch client for the API. Used when RTK Query is not an option.
 * Dynamically updates when the token or base url changes.
 * Use `$client.get()` to get the client.
 *
 * @example
 * const { get, post, del } = $client.get();
 */
export const $client = computed(
  [$authToken, $baseUrl, $projectId],
  (authToken, baseUrl, projectId) =>
    createClient<paths>({
      headers: {
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...(projectId ? { 'project-id': projectId } : {}),
      },
      // do not include `api/v1` in the base url for this client
      baseUrl: `${baseUrl ?? ''}`,
    })
);