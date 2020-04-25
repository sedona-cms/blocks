import Vue from 'vue'
<% for (const block of options.blocks) { %>
import <%= block.name %> from '<%= block.path %>' <% } %>

<% for (const block of options.blocks) { %>
Vue.component('<%= block.name %>', <%= block.name %>)<% } %>
