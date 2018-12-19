import { vueAuth } from '@/services/symbolic'

export const authLink = {
  data () {
    return {
      isAuthenticated: vueAuth.isAuthenticated()
    }
  },
  methods: {
    protectedEndpoint (url) {
      return this.isProtected() ? url : '/login'
    },
    isProtected () {
      return this.isAuthenticated
    }
  }
}
