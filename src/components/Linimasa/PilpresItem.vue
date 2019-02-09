<template>
  <div class="group">
    <div class="group-tilte">
      <div class="group-thumb">
        <img :src="group_avatar" :alt="team_name" v-if="group_avatar && group_avatar.length > 0">
        <img src="@/assets/icon-group.png" alt="group-avatar" v-else>
      </div>
      <div class="group-name">
        <p>Disematkan dari {{ team_name }}</p>
      </div>
    </div>
    <div class="group-content">
      <div class="content-thumb">
        <div class="image-thumb">
          <img :src="user_avatar" :alt="user_name" v-if="user_avatar && user_avatar.length > 0">
          <img src="@/assets/user.svg" alt="user-avatar">
        </div>
        <div class="icon-thumb">
          <img src="@/assets/icon-twitter-rounded.svg" alt>
        </div>
      </div>
      <div class="content-desc">
        <div class="title-desc">
          <h5>
            {{ user_fullname }}
            <span>{{ `@${user_name}` }}</span>.
            <span>{{ created_at_in_word }}</span>
          </h5>
        </div>
        <div class="desc-text">
          <p v-html="description"></p>
        </div>
      </div>
      <div class="content-action">
        <a
          href
          class="icon-setting"
          :class="{'is-active': isActive == id}"
          @click.prevent="$emit('toggleDropdown', $event)"
        >
          <img class="icon-dots" src="@/assets/dots-icon.svg" alt>
        </a>
        <div class="dropdown-content">
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                @click.stop="$emit('onOpenTwitter', `https://twitter.com/${user_name}/status/${source_id}`)"
              >
                <sosmed-twitter-icon/>Buka di Web Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentLoader from '@/components/Loading/ContentLoader'

import {
  LinkIcon,
  SosmedTwitterIcon,
  ShareIcon,
  MoreHorizontalIcon
} from '@/svg/icons'

export default {
  name: 'PilpresItem',
  props: {
    id: String,
    group_avatar: String,
    team_name: String,
    user_fullname: String,
    user_avatar: String,
    user_name: String,
    created_at_in_word: String,
    description: String,
    source_id: String,
    isActive: [Boolean, String]
  },

  components: {
    LinkIcon,
    SosmedTwitterIcon,
    ShareIcon,
    MoreHorizontalIcon,
    ContentLoader
  }
}
</script>
