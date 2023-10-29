<template>
  <div class="container">
    <h1 v-if="isMember == false">You are not a member yet.</h1>
    <div v-if="isMember">
      <div class="price-container container">
        <div class="row">
          <h5>Price analysis:</h5>
          <p>{{ priceAnalysis }}</p>
        </div>
      </div>
      <div class="reports-container container">
        <div class="row">
          <div class="col-6">
            <h5>Current market emotions analysis:</h5>
            <p>
              {{
                reports.length > 0 ? reports[reports.length - 1].report : "No report"
              }}
            </p>
          </div>
          <div class="col-6">
            <h5>Current market sentiment (greed - fear):</h5>
            <p>{{ sentiment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "@/services/api";
import Ethers from "@/services/ethers";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Content",
  data() {
    return {
      priceAnalysis: String,
      reports: [],
      sentiment: String,
      isMember: false,
    };
  },
  async mounted() {
    const api = new Api();

    const ethers = new Ethers();
    await ethers.connect();

    const memberRes = await api.isMember(ethers.address);
    this.isMember = memberRes.data.is_member;

    const reports = await api.getReports();
    this.reports = reports.data.data;
    console.log("WE got REPORTS: ", reports.data.data[0].report)



    const priceAnalysis = await api.getPriceAnalysis();
    this.priceAnalysis = priceAnalysis.data.data[priceAnalysis.data.data.length-1].report;

    const sentiment = await api.getSentiments();
    console.log("sentiiment:: ", sentiment.data.data[sentiment.data.data.length-1].sentiment);
    this.sentiment =  sentiment.data.data[sentiment.data.data.length-1].sentiment;
  },
};
</script>