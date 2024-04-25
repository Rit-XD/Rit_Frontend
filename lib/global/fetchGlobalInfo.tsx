import {BlogSchema} from '@/channels/discover/blog/Blog.schema'
import {ExperimentsSchema} from '@/channels/discover/experiments/Experiments.schema'
import {ReelsSchema} from '@/channels/discover/reels/Reels.schema'
import {VideosSchema} from '@/channels/discover/videos/Videos.schema'
import {fetchDemosAndShows} from '@/channels/experience/demoshowdetail/fetchDemosAndShows'
import {DemosShowsSchema} from '@/channels/experience/demosshows/DemosShows.schema'
import {WorkshopsSchema} from '@/channels/experience/workshops/Workshops.schema'
import {fetchWorkshops} from '@/channels/experience/workshops/workshopdetail/fetchWorkshops'
import {AgeSchema} from '@/channels/global/ages/Age.schema'
import {ThemeSchema} from '@/channels/global/themes/Theme.schema'
import {ZoneSchema} from '@/channels/global/zones/Zone.schema'
import {fetchBadgeCategories} from '@/channels/profile/badges/fetchBadgeCategories'
import {VisitSchema} from '@/channels/visit/Visit.schema'
import {ActivitiesSchema} from '@/channels/visit/activities/Activities.schema'
import {AddActivitySchema} from '@/channels/visit/activities/add/AddActivity.schema'
import {AddCustomActivitySchema} from '@/channels/visit/custom/add/AddCustomActivity.schema'
import {EditCustomActivitySchema} from '@/channels/visit/custom/edit/EditCustomActivity.schema'
import {cms} from '@/cms'
import {Locale} from '@/util/locale'
import {Entry} from 'alinea/core'

export type Globalinfo = Awaited<ReturnType<typeof fetchGlobalInfo>>

export async function fetchGlobalInfo(locale: string) {
  const zones = await cms
    .locale(locale)
    .find(ZoneSchema().select({...ZoneSchema, id: Entry.i18nId}))
  const themes = await cms
    .locale(locale)
    .find(ThemeSchema().select({...ThemeSchema, id: Entry.i18nId}))
  const ages = await cms
    .locale(locale)
    .find(AgeSchema().select({...AgeSchema, id: Entry.i18nId}))

  const selectors = {title: Entry.title, url: Entry.url}
  const [
    visitPage,
    experimentsPage,
    blogsPage,
    videosPage,
    reelsPage,
    workshopsPage,
    demosAndShowsPage,
    addActivityPages,
    activitiesPage,
    addCustomActivityPage,
    editCustomActivityPage
  ] = await Promise.all([
    cms.locale(locale).maybeGet(VisitSchema().select(selectors)),
    cms.locale(locale).maybeGet(ExperimentsSchema().select(selectors)),
    cms.locale(locale).maybeGet(BlogSchema().select(selectors)),
    cms.locale(locale).maybeGet(VideosSchema().select(selectors)),
    cms.locale(locale).maybeGet(ReelsSchema().select(selectors)),
    cms.locale(locale).maybeGet(WorkshopsSchema().select(selectors)),
    cms.locale(locale).maybeGet(DemosShowsSchema().select(selectors)),
    cms.locale(locale).find(
      AddActivitySchema().select({
        ...selectors,
        reservation: AddActivitySchema.perform_reservation
      })
    ),
    cms.locale(locale).maybeGet(ActivitiesSchema().select(selectors)),
    cms.locale(locale).maybeGet(AddCustomActivitySchema().select(selectors)),
    cms.locale(locale).maybeGet(EditCustomActivitySchema().select(selectors))
  ])

  const badges = await fetchBadgeCategories(locale as Locale)
  const demosAndShow = await fetchDemosAndShows(locale as Locale)
  const workshops = await fetchWorkshops(locale as Locale)

  return {
    zones,
    themes,
    demosAndShow,
    workshops,
    ages,
    badges,
    links: {
      visit: {
        index: {
          title: visitPage?.title || 'visit',
          url: visitPage?.url || '/'
        },
        activities: {
          title: activitiesPage?.title || 'activities',
          url: activitiesPage?.url || '/'
        },
        addActivity: {
          title:
            addActivityPages.find(p => !p.reservation)?.title || 'add activity',
          url: addActivityPages.find(p => !p.reservation)?.url || '/'
        },
        addReservation: {
          title:
            addActivityPages.find(p => p.reservation)?.title ||
            'add reservation',
          url: addActivityPages.find(p => p.reservation)?.url || '/'
        },
        addCustomActivity: {
          title: addCustomActivityPage?.title || 'add custom activity',
          url: addCustomActivityPage?.url || '/'
        },
        editCustomActivity: {
          title: editCustomActivityPage?.title || 'edit activity',
          url: editCustomActivityPage?.url || '/'
        }
      },
      activities: {
        workshops: {
          title: workshopsPage?.title || 'experiments',
          url: workshopsPage?.url || '/'
        },
        demosAndShows: {
          title: demosAndShowsPage?.title || 'experiments',
          url: demosAndShowsPage?.url || '/'
        }
      },
      discover: {
        experiments: {
          title: experimentsPage?.title || 'experiments',
          url: experimentsPage?.url || '/'
        },
        videos: {
          title: videosPage?.title || 'videos',
          url: videosPage?.url || '/'
        },
        reels: {
          title: reelsPage?.title || 'videos',
          url: reelsPage?.url || '/'
        },
        blogs: {
          title: blogsPage?.title || 'blogs',
          url: blogsPage?.url || '/'
        }
      }
    }
  }
}
