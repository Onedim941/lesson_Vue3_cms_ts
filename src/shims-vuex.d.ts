import { Store } from '@/store' // path to store file
import { IglobalFilters } from '@/global/type'
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store
    $filters: IglobalFilters
  }
}
