import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8r65v0t1',
    dataset: 'production'
  },
  /**
   * Studio hostname for sanity.studio deployment.
   * Your studio will be at https://delivaryapp0234.sanity.studio
   */
  studioHost: 'delivaryapp0234',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
