<template>
  <div>
    <coming-soon v-if="component === 'coming-soon'" :debat="debat"></coming-soon>
    <incoming v-if="component === 'incoming'" :debat="debat"></incoming>
    <incoming-direct v-if="component === 'incoming-direct'" :debat="debat"></incoming-direct>
    <waiting-confirmation v-if="component === 'waiting-confirmation'" :debat="debat"></waiting-confirmation>
    <waiting-opponent-confirmation v-if="component === 'waiting-opponent-confirmation'" :debat="debat"></waiting-opponent-confirmation>
    <waiting v-if="component === 'waiting'" :debat="debat"></waiting>
    <confirm v-if="component === 'confirm'" :debat="debat"></confirm>
    <rejected v-if="component === 'rejected'" :debat="debat"></rejected>
    <accepted v-if="component === 'accepted'" :debat="debat"></accepted>
    <display v-if="component === 'display'" :debat="debat"></display>
    <done v-if="component === 'done'" :debat="debat"></done>
    <live v-if="component === 'live'" :debat="debat"></live>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import LayoutTimeline from '@/layout/Timeline'
import ComingSoon from '@/components/wordstadium/detail/coming-soon'
import Incoming from '@/components/wordstadium/detail/incoming'
import IncomingDirect from '@/components/wordstadium/detail/incoming-direct'
import WaitingConfirmation from '@/components/wordstadium/detail/waiting-confirmation'
import WaitingOpponentConfirmation from '@/components/wordstadium/detail/waiting-opponent-confirmation'
import Waiting from '@/components/wordstadium/detail/waiting'
import Confirm from '@/components/wordstadium/detail/confirm'
import Rejected from '@/components/wordstadium/detail/rejected'
import Accepted from '@/components/wordstadium/detail/accepted'
import Display from '@/components/wordstadium/detail/display'
import Done from '@/components/wordstadium/detail/done'
import Live from '@/components/wordstadium/detail/live'

export default {
  name: 'DetailDebat--Container',
  components: {
    LayoutTimeline,
    ComingSoon,
    Incoming,
    Waiting,
    WaitingConfirmation,
    WaitingOpponentConfirmation,
    Confirm,
    IncomingDirect,
    Rejected,
    Accepted,
    Display,
    Done,
    Live
  },
  computed: {
    id() { return this.$route.params.id },
    debat() { return this.$store.getters['wordstadium/challengeById'](this.id) },
    progress() { return this.debat.progress },
    type() { return this.debat.type },
    challenger() { return this.debat.audiences.find(it => it.role === 'challenger') },
    opponent() { return this.debat.audiences.find(it => it.role === 'opponent') },
    candidate() { return this.debat.audiences.find(it => it.role === 'opponent_candidate') },
    candidates() { return this.debat.audiences.filter(it => it.role === 'opponent_candidate') },
    condition() { return this.debat.condition },
    me() { return this.$store.getters['profile/username'] },
    isOwner() { return this.me === this.challenger.username },
    isOpen() { return this.type === 'OpenChallenge' },
    isDirect() { return this.type === 'DirectChallenge' },
    isCandidate() { return this.candidates.some(it => it.username === this.me) },
    component() {
      if (this.debat == null) return null

      if (this.condition === 'expired') return 'expired'
      if (this.progress === 'done') return 'done'
      if (this.progress === 'live_now') return 'live'
      if (this.progress === 'coming_soon' && this.condition === 'ongoing') return 'coming-soon'
      if (this.progress === 'waiting_confirmation' && this.condition === 'rejected') return 'rejected'
      if (this.progress === 'waiting_confirmation' && this.isOwner && this.isOpen) return 'confirm'
      if (this.progress === 'waiting_confirmation' && !this.isOwner && this.isDirect) return 'incoming-direct'
      if (this.progress === 'waiting_confirmation' && this.isOwner && this.isDirect) return 'waiting-opponent-confirmation'
      if (this.progress === 'waiting_confirmation' && this.isOpen && this.isCandidate) return 'accepted'
      if (this.progress === 'waiting_opponent' && this.isOpen && !this.isOwner) return 'incoming'
      if (this.progress === 'waiting_opponent' && this.isOwner && this.isDirect) return 'waiting-opponent-confirmation'
      if (this.progress === 'waiting_opponent' && this.isOwner) return 'waiting'

      return 'display'
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(id) { this.$store.dispatch('wordstadium/getChallengeById', id) }
    },
  }
}
</script>
